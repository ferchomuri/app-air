import React, { useState } from "react";
import { Input } from "../../components/input/Input";
import { Text } from "../../components/text/Text";
import { Title } from "../../components/title/Title";
import Pin from "../../assets/map-pin.png";
import PinGray from "../../assets/map-pin-gray.png";
import "./Home.css";
import { Dialog } from "../../components/dialog/Dialog";
import { Button } from "../../components/button/Button";

export type IHomeProps = {
  // TODO
};

const options = [
  { value: "1", label: "1", sublabel: "sublabel 1" },
  { value: "2", label: "2", sublabel: "sublabel 2" },
  { value: "3", label: "3", sublabel: "sublabel 3" },
  { value: "4", label: "4", sublabel: "sublabel 4" },
  { value: "5", label: "5", sublabel: "sublabel 5" },
];

const Home: React.FC<IHomeProps> = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
          <Input icon={Pin} />
          {options.map((option, key) => (
            <div key={key}>
              <img className='icon-btn' src={PinGray} />
              <button className='btn-option '>
                <Text
                  text={option.label}
                  color='#000000'
                  weight={600}
                  size={"16px"}
                  minSpace
                />
                <Text
                  text={option.sublabel}
                  color='#9da2ad'
                  size={"16px"}
                  minSpace
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={openModal}>Abrir Modal</button>
      <Dialog isOpen={isModalOpen} onClose={closeModal}>
        <Title text='Address updated' level={2} color='#000000' />
        <Text text='New address added to your account' />
        <Text text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s' />
        <Text text="Let's go shopping!" />
        <Button text='UNDERSTOOD' />
      </Dialog>
    </>
  );
};

export { Home };
