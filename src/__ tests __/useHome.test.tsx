/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from "@testing-library/react";
import { useHome } from "../hooks/useHome";

window.google = {
  maps: {
    ...window?.google?.maps,
    places: {
      ...window?.google?.maps?.places,
      AutocompleteService: jest.fn(),
      PlacesService: jest.fn(() => ({
        getDetails: jest.fn(),
      })) as any,
      Autocomplete: jest.fn().mockImplementation(() => {
        return {
          addListener: jest.fn(),
        };
      }),
    },
  },
};

describe("useHome", () => {
  it("should initialize state correctly", () => {
    const { result } = renderHook(() => useHome());
    const { state } = result.current;

    expect(state.isModalOpen).toBeFalsy();
    expect(state.inputValue).toBe("");
    expect(state.predictions).toHaveLength(0);
    expect(state.validZip).toBeFalsy();
  });

  it("should open modal when openModal is called", async () => {
    const { result } = renderHook(() => useHome());
    const { openModal } = result.current;

    act(() => {
      openModal();
    });

    const { state } = result.current;
    expect(state.isModalOpen).toBeTruthy();
  });

  it("should close modal when closeModal is called", () => {
    const { result } = renderHook(() => useHome());
    const { openModal, closeModal } = result.current;

    act(() => {
      openModal();
      closeModal();
    });

    const { state } = result.current;
    expect(state.isModalOpen).toBeFalsy();
  });

  it("should update inputValue when handleInputChange is called", () => {
    const { result } = renderHook(() => useHome());
    const { handleInputChange } = result.current;

    const event = { target: { value: "test" } };
    act(() => {
      handleInputChange(event as any);
    });

    const { state } = result.current;
    expect(state.inputValue).toBe("test");
  });

  it("should set validZip to true when handleSelectPlace is called with an allowed zip code", () => {
    const { result } = renderHook(() => useHome());
    const { handleSelectPlace } = result.current;

    act(() => {
      handleSelectPlace("10286");
    });

    const { state } = result.current;
    expect(state.validZip).toBeTruthy();
  });

  it("should set validZip to false when handleSelectPlace is called with a disallowed zip code", () => {
    const { result } = renderHook(() => useHome());
    const { handleSelectPlace } = result.current;

    act(() => {
      handleSelectPlace("98765");
    });

    const { state } = result.current;
    expect(state.validZip).toBeFalsy();
  });

  it("should clear predictions when inputValue is empty", () => {
    const mockGetDirections = jest.fn();
    const { result } = renderHook(() => useHome(), {
      initialProps: {
        getDirections: mockGetDirections,
      },
    });

    let event = { target: { value: "test" } };
    result.current.handleInputChange(event as any);

    event = { target: { value: "" } };
    result.current.handleInputChange(event as any);

    expect(result.current.state.predictions).toHaveLength(0);
  });
});
