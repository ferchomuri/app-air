import { useEffect, useState, useCallback, useMemo } from "react";
import { alowed } from "../data/zipsAllowed.json";

interface IHomeState {
  isModalOpen: boolean;
  inputValue: string;
  predictions: PlacePrediction[];
  validZip: boolean;
}

interface PlacePrediction {
  placeId: string;
  description: string;
  name: string;
  postalCode: string;
}

export const useHome = () => {
  const [state, setState] = useState<IHomeState>({
    isModalOpen: false,
    inputValue: "",
    predictions: [],
    validZip: false,
  });

  const service = useMemo(() => {
    return new google.maps.places.AutocompleteService();
  }, []);
  const serviceDetails = useMemo(() => {
    return new google.maps.places.PlacesService(document.createElement("div"));
  }, []);

  const { inputValue } = state;

  const openModal = useCallback(
    () => setState((prevState) => ({ ...prevState, isModalOpen: true })),
    []
  );

  const closeModal = useCallback(
    () => setState((prevState) => ({ ...prevState, isModalOpen: false })),
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, inputValue: e.target.value }));
    },
    []
  );

  const handleSelectPlace = useCallback(
    (postalCode: string) => {
      setState((prevState) => ({
        ...prevState,
        validZip: alowed.includes(postalCode),
      }));
      openModal();
    },
    [openModal]
  );

  const getDirections = useCallback(async () => {
    if (inputValue === "") return;

    const request = {
      input: inputValue,
    };

    try {
      const predictions = await new Promise((resolve) => {
        service.getPlacePredictions(request, (predictions) => {
          resolve(predictions || []);
        });
      });

      const tempPredictions = await Promise.all(
        (predictions as google.maps.places.AutocompletePrediction[]).map(
          (prediction) => {
            return new Promise((resolve) => {
              const tempPrediction = {
                placeId: prediction.place_id,
                description: "",
                name: "",
                postalCode: "",
              };

              serviceDetails.getDetails(
                { placeId: prediction.place_id },
                (place) => {
                  tempPrediction.description =
                    (place?.formatted_address &&
                      place?.formatted_address
                        .replace(`${place?.name},`, "")
                        .trim()) ||
                    "";
                  tempPrediction.name = place?.name || "";

                  if (place?.address_components !== undefined) {
                    const postalCode = place?.address_components.find(
                      (component) => {
                        return component.types.includes("postal_code");
                      }
                    );

                    tempPrediction.postalCode = postalCode?.long_name || "";
                  }

                  resolve(tempPrediction);
                }
              );
            });
          }
        )
      );

      setState((prevState) => ({
        ...prevState,
        predictions: (tempPredictions as PlacePrediction[]) || [],
      }));
    } catch (error) {
      console.error("Error getting predictions:", error);
    }
  }, [inputValue, service, serviceDetails]);

  useEffect(() => {
    if (inputValue.length > 0) {
      getDirections();
    } else {
      setState((prevState) => ({ ...prevState, predictions: [] }));
    }
  }, [inputValue, getDirections]);

  return {
    service,
    state,
    openModal,
    closeModal,
    handleInputChange,
    handleSelectPlace,
    getDirections,
  };
};
