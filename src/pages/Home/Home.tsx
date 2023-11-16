import React from "react";
import { Input } from "../../components/input/Input";
import { Text } from "../../components/text/Text";
import { Title } from "../../components/title/Title";
import Pin from "../../assets/map-pin.png";
import PinGray from "../../assets/map-pin-gray.png";
import { Dialog } from "../../components/dialog/Dialog";
import { Button } from "../../components/button/Button";
import "./Home.css";
import { useHome } from "../../hooks/useHome";

export interface IHomeProps {}

interface PlacePrediction {
  placeId: string;
  description: string;
  name: string;
  postalCode: string;
}

const Home: React.FC = () => {
  const { state, closeModal, handleInputChange, handleSelectPlace } = useHome();

  const { inputValue, predictions } = state;
  return (
    <>
      <div className='container'>
        <Title text='Where are you located?' level={1} color='#000000' />
        <Text
          text='So we know where to drop off the stuff'
          color='#000000'
          weight={600}
          size={"16px"}
        />
        <Text
          text={`We won't share your address`}
          color='#9da2ad'
          size={"16px"}
        />
        <Text
          text={`with your ex (or whoever).`}
          color='#9da2ad'
          size={"16px"}
        />
        <div className='container-fields'>
          <Input icon={Pin} value={inputValue} onChange={handleInputChange} />
          {predictions.slice(0, 3).map((prediction: PlacePrediction) => (
            <div key={prediction.placeId}>
              <img className='icon-btn' src={PinGray} alt='Pin' />
              <button
                className='btn-option'
                onClick={() => handleSelectPlace(prediction.postalCode)}
              >
                <Text
                  text={prediction.name}
                  color='#000000'
                  weight={600}
                  size={"16px"}
                  minSpace
                />
                <Text
                  text={prediction.description}
                  color='#9da2ad'
                  size={"16px"}
                  minSpace
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Dialog isOpen={state.isModalOpen} onClose={closeModal}>
        <div className='general-dialog-content'>
          <div className='row-dialog'>
            <Title
              text={state.validZip ? "Address updated" : "Out of Delivery Area"}
              level={2}
              color='#000000'
            />
            <Text
              center
              weight={600}
              text={
                state.validZip
                  ? "New address added to your account"
                  : '"Wherever I go, there I am"'
              }
            />
            <Text
              center
              weight={600}
              text={
                state.validZip
                  ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
                  : "Sadly, this quote is not true for us. In other words, we are not operating in your area (yet), but things change every day."
              }
            />
            <Text
              center
              weight={600}
              text={
                state.validZip
                  ? "Let's go shopping!"
                  : "Sign up for our newsletter to get notified."
              }
            />
          </div>
          <Button text='UNDERSTOOD' onClick={closeModal} />
        </div>
      </Dialog>
    </>
  );
};

export { Home };
