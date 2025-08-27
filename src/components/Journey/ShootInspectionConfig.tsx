import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { Upload, Download, Plus, Edit, Trash2, GripVertical, X } from 'lucide-react';
import { ShootStep, ShootInspectionData } from '../../types';

interface ShootInspectionConfigProps {
  onSave: (config: ShootInspectionData) => void;
  onCancel: () => void;
  initialData?: ShootInspectionData;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'es', name: 'Español' },
  { code: 'no', name: 'Norsk' },
  { code: 'sv', name: 'Svenska' }
];

const typeImageOptions = [
  { value: 0, label: 'Standard' },
  { value: 3, label: 'Interior' },
  { value: 1, label: 'Additional' }
];

const stepTypeOptions = [
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'additional', label: 'Additional' }
];

export default function ShootInspectionConfig({ onSave, onCancel, initialData }: ShootInspectionConfigProps) {
  // Default steps data from the provided JSON
  const defaultSteps: ShootStep[] = [
    {
      "angle": 0,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/front@2x.png",
      "title": {
        "name": "front",
        "localization": [
          {
            "locale": "fr",
            "title": "Avant"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/front.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez l'avant de votre voiture"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the front of your car"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie die Vorderseite Ihres Autos."
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa il muso dell'auto"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de voorkant van uw auto."
          },
          {
            "locale": "es",
            "title": null,
            "content": "Tome una foto de la parte delantera de tu coche"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på bilens front"
          }
        ]
      }
    },
    {
      "angle": 2,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/frontT34Driver@2x.png",
      "title": {
        "name": "frontT34Driver",
        "localization": [
          {
            "locale": "fr",
            "title": "Avant Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/frontT34Driver.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis l'angle avant-gauche"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from a front-left 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der vorderen linken Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto di tre quarti dal davanti (lato conduttore)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen vanaf de linker voorzijde  "
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía todo tu coche desde la esquina delantera izquierda"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från 45 graders vinkel framifrån vänster"
          }
        ]
      }
    },
    {
      "angle": 3,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/frontT34DriverInspect@2x.png",
      "title": {
        "name": "frontT34DriverInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Avant Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/frontT34DriverInspectLandscape.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez de près l'angle avant-gauche"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot from a front-left 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Machen Sie eine Nahaufnahme der vorderen linken Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto ravvicinata di tre quarti dal davanti (lato conduttore)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een close-up foto vanaf  de linker voorzijde "
          },
          {
            "locale": "es",
            "title": null,
            "content": "Toma un primer plano de la esquina delantera izquierda"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild från 45 graders vinkel framifrån vänster"
          }
        ]
      }
    },
    {
      "angle": 4,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sideDriver@2x.png",
      "title": {
        "name": "sideDriver",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sideDriver.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis le côté conducteur"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from the driver side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der Fahrerseite aus"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa tutto il lato conduttore dell'auto"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen aan de bestuurderszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografiar todo el coche desde el lado del conductor"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från förarsidan"
          }
        ]
      }
    },
    {
      "angle": 5,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sideDriverFrontInspect@2x.png",
      "title": {
        "name": "sideDriverFrontInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sideDriverFrontInspect.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez la partie avant de la voiture du côté conducteur"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot of the front of the car from the driver side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie den vorderen Teil des Autos von der Fahrerseite"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa la parte anteriore del lato conduttore"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de voorkant van de wagen aan de bestuurderszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía la parte delantera desde el lado del conductor"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild på bilens front från förarsidan"
          }
        ]
      }
    },
    {
      "angle": 6,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sideDriverBackInspect@2x.png",
      "title": {
        "name": "sideDriverBackInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sideDriverBackInspect.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez la partie arrière de la voiture du côté conducteur"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot of the rear of the car from the driver side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie den hinteren Teil des Autos von der Fahrerseite"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa la parte posteriore del lato conduttore"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de achterkant van de wagen aan de bestuurderszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía la parte trasera desde el lado del conductor"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild på bilens baksida från förarsidan"
          }
        ]
      }
    },
    {
      "angle": 7,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/backT34Driver@2x.png",
      "title": {
        "name": "backT34Driver",
        "localization": [
          {
            "locale": "fr",
            "title": "Arrière Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/backT34Driver.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis l'angle arrière-gauche"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from a rear-left 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der hinteren linken Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto di tre quarti dal retro (lato conduttore)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen van links achter"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía tu coche entero desde la esquina trasera izquierda"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från 45 graders vinkel bakifrån vänster"
          }
        ]
      }
    },
    {
      "angle": 8,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/backT34DriverInspect@2x.png",
      "title": {
        "name": "backT34DriverInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Arrière Conducteur"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/backT34DriverInspectLandscape.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez de près l'angle arrière-gauche"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot from a rear-left 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Machen Sie eine Nahaufnahme der hinteren linken Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto ravvicinata di tre quarti dal retro (lato conduttore)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een close-up foto van de linker achterzijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Toma un primer plano de la esquina trasera izquierda"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild från 45 graders vinkel bakifrån vänster"
          }
        ]
      }
    },
    {
      "angle": 9,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/back@2x.png",
      "title": {
        "name": "back",
        "localization": [
          {
            "locale": "fr",
            "title": "Arrière"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/back.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez l'arrière de votre voiture"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the rear of your car"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie die Rückseite Ihres Autos."
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa il retro dell'auto"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de achterkant van uw auto"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Tome una foto de la parte trasera de tu coche"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på bilens baksida"
          }
        ]
      }
    },
    {
      "angle": 11,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/backT34Passenger@2x.png",
      "title": {
        "name": "backT34Passenger",
        "localization": [
          {
            "locale": "fr",
            "title": "Arrière Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/backT34Passenger.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis l'angle arrière-droit"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from a rear-right 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der hinteren rechten Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto di tre quarti dal retro (lato passeggero)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen vanaf de rechter achterzijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía todo tu coche desde la esquina trasera derecha"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från 45 graders vinkel bakifrån höger"
          }
        ]
      }
    },
    {
      "angle": 12,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/backT34PassengerInspect@2x.png",
      "title": {
        "name": "backT34PassengerInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Arrière Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/backT34PassengerInspectLandscape.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez de près l'angle arrière-droit"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot from a rear-right 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Machen Sie eine Nahaufnahme der hinteren rechte Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto ravvicinata di tre quarti dal retro (lato passeggero)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een close-up foto vanaf  de rechter achterzijde "
          },
          {
            "locale": "es",
            "title": null,
            "content": "Toma un primer plano de la esquina trasera derecha"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild från 45 graders vinkel bakifrån höger"
          }
        ]
      }
    },
    {
      "angle": 13,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sidePassenger@2x.png",
      "title": {
        "name": "sidePassenger",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sidePassenger.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis le côté passager"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from the passenger side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der Beifahrerseite"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa tutto il lato passeggero dell'auto"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen aan de passagierszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía tu coche entero desde el lado del pasajero"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från passagerarsidan"
          }
        ]
      }
    },
    {
      "angle": 14,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sidePassengerBackInspect@2x.png",
      "title": {
        "name": "sidePassengerBackInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sidePassengerBackInspect.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": false
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez la partie arrière de la voiture du côté passager"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot of the rear of the car from the passenger side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie den hinteren Teil des Autos von der Beifahrerseite"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa la parte anteriore del lato passeggero"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de achterkant uw wagen aan de passagierszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía la parte trasera desde el lado del acompañante"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild på bilens baksida från passagerarsidan"
          }
        ]
      }
    },
    {
      "angle": 15,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/sidePassengerFrontInspect.png",
      "title": {
        "name": "sidePassengerFrontInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Côté Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/sidePassengerFrontInspect.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez la partie avant de la voiture du côté passager"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot of the front of the car from the passenger side"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie den vorderen Teil des Autos von der Beifahrerseite"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Fotografa la parte posteriore del lato passeggero"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van de voorkant van uw wagen aan de passagierszijde"
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía la parte delantera desde el lado del acompañante"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild på bilens front från passagerarsidan"
          }
        ]
      }
    },
    {
      "angle": 16,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/frontT34Passenger@2x.png",
      "title": {
        "name": "frontT34Passenger",
        "localization": [
          {
            "locale": "fr",
            "title": "Avant Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/frontT34Passenger.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez votre voiture en entier depuis l'angle avant-droit"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a shot of the whole car from a front-right 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Fotografieren Sie Ihr gesamtes Auto von der vorderen rechten Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto di tre quarti dal davanti (lato passeggero)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een foto van uw hele wagen vanaf de rechter voorzijde  "
          },
          {
            "locale": "es",
            "title": null,
            "content": "Fotografía tu coche entero desde la esquina delantera derecha"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta ett foto på hela bilen från 45 graders vinkel framifrån höger"
          }
        ]
      }
    },
    {
      "angle": 17,
      "quality": true,
      "optional": false,
      "typeImage": 0,
      "typeExterior": 0,
      "retry": 2,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/frontT34PassengerInspect@2x.png",
      "title": {
        "name": "frontT34PassengerInspect",
        "localization": [
          {
            "locale": "fr",
            "title": "Avant Passager"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/frontT34PassengerInspectLandscape.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": false,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": null,
            "content": "Photographiez de près l'angle avant-droit"
          },
          {
            "locale": "en",
            "title": null,
            "content": "Take a close up shot from a front-right 45-degree angle"
          },
          {
            "locale": "de",
            "title": null,
            "content": "Machen Sie eine Nahaufnahme der vorderen rechten Ecke"
          },
          {
            "locale": "it",
            "title": null,
            "content": "Prendi una foto ravvicinata di tre quarti dal davanti (lato passeggero)"
          },
          {
            "locale": "nl",
            "title": null,
            "content": "Neem een close-up foto vanaf  de rechter voorzijde "
          },
          {
            "locale": "es",
            "title": null,
            "content": "Toma un primer plano de la esquina delantera derecha"
          },
          {
            "locale": "sv",
            "title": null,
            "content": "Ta en närbild från 45 graders vinkel framifrån höger"
          }
        ]
      }
    },
    {
      "quality": false,
      "optional": false,
      "typeImage": 3,
      "typeInterior": 0,
      "retry": 0,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/backSeatDriver.png",
      "title": {
        "name": "backSeatDriver",
        "localization": [
          {
            "locale": "fr",
            "title": "Sièges arrière"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/backSeatDriver.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": "Sièges arrière",
            "content": null
          },
          {
            "locale": "en",
            "title": "Back seats",
            "content": null
          },
          {
            "locale": "de",
            "title": "Rücksitze",
            "content": null
          },
          {
            "locale": "it",
            "title": "Sedili posteriori",
            "content": null
          },
          {
            "locale": "nl",
            "title": "Achterbank",
            "content": null
          },
          {
            "locale": "es",
            "title": "Asientos traseros",
            "content": null
          },
          {
            "locale": "sv",
            "title": "Baksäten",
            "content": null
          }
        ]
      }
    },
    {
      "quality": false,
      "optional": false,
      "typeImage": 3,
      "typeInterior": 2,
      "retry": 0,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/roofLining.png",
      "title": {
        "name": "panoramicRoof",
        "localization": [
          {
            "locale": "fr",
            "title": "Toit panoramique"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/roofLining.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": "Toit panoramique",
            "content": "Assurez-vous que la vitre panoramique est visible."
          },
          {
            "locale": "en",
            "title": "Panoramic Roof",
            "content": "Please ensure the panoramic roof is visible."
          },
          {
            "locale": "de",
            "title": "Panoramadach",
            "content": "Stelle sicher, dass die gesamte Panorama-Verglasung sichtbar ist."
          },
          {
            "locale": "it",
            "title": "Tetto panoramico",
            "content": "Assicurarsi che il vetro panoramico sia visibile."
          },
          {
            "locale": "nl",
            "title": "Panoramadak",
            "content": "Zorg ervoor dat het panoramisch glas zichtbaar is."
          },
          {
            "locale": "es",
            "title": "Techo panorámico",
            "content": "Asegúrate que todo el vidrio del techo panorámico este visible"
          },
          {
            "locale": "no",
            "title": "Takforing",
            "content": "Ta bildet av taklisten."
          },
          {
            "locale": "sv",
            "title": "Panoramatak",
            "content": "Säkerställ att panormaglaset är synligt."
          }
        ]
      }
    },
    {
      "quality": false,
      "optional": false,
      "typeImage": 3,
      "typeInterior": 0,
      "retry": 0,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/frontSeatDriver.png",
      "title": {
        "name": "frontSeatDriver",
        "localization": [
          {
            "locale": "fr",
            "title": "Sièges avant"
          }
        ]
      },
      "overlay": {
        "url": "https://webapp.tchek.fr/assets/images/shoot-sides/overlay/frontSeatDriver.svg",
        "constraints": {
          "portrait": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          },
          "landscape": {
            "position": 0,
            "scaleType": 0,
            "marginStart": true,
            "marginEnd": true
          }
        }
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": "Sièges avant",
            "content": null
          },
          {
            "locale": "en",
            "title": "Front seats",
            "content": null
          },
          {
            "locale": "de",
            "title": "Vordersitze",
            "content": null
          },
          {
            "locale": "it",
            "title": "Sedili anteriori",
            "content": null
          },
          {
            "locale": "nl",
            "title": "Voorzetels",
            "content": null
          },
          {
            "locale": "es",
            "title": "Asientos delanteros",
            "content": null
          },
          {
            "locale": "sv",
            "title": "Framsäten",
            "content": null
          }
        ]
      }
    },
    {
      "quality": false,
      "optional": false,
      "typeImage": 3,
      "typeAdditional": 2,
      "retry": 0,
      "showHelp": true,
      "urlThumb": "https://webapp.tchek.fr/assets/images/shoot-sides/speedometer.png",
      "title": {
        "name": "speedometer",
        "localization": [
          {
            "locale": "fr",
            "title": "Odomètre"
          }
        ]
      },
      "help": {
        "localization": [
          {
            "locale": "fr",
            "title": "Kilométrage",
            "content": "Démarrer le moteur et prendre la photo du compteur."
          },
          {
            "locale": "en",
            "title": "Mileage",
            "content": "Start the engine and shoot the odometer."
          },
          {
            "locale": "de",
            "title": "Kilometerstand",
            "content": "Starten Sie den Motor und machen Sie ein Foto vom Kilometerzähler"
          },
          {
            "locale": "it",
            "title": "Chilometraggio",
            "content": "Metti in marcia e fotografa il contachilometri."
          },
          {
            "locale": "nl",
            "title": "Kilometerteller ",
            "content": "Start de motor en neem de kilometerstand op."
          },
          {
            "locale": "es",
            "title": "Kilometraje",
            "content": "Arranca el motor y haz una foto del cuentakilómetros."
          },
          {
            "locale": "sv",
            "title": "Körsträcka",
            "content": "Start the engine and shoot the odometer."
          }
        ]
      }
    }
  ];

  const [shootData, setShootData] = useState<ShootInspectionData>(
    initialData || {
      id: '',
      name: '',
      description: '',
      config: defaultSteps
    }
  );

  const [editingStep, setEditingStep] = useState<{ step: ShootStep; index: number } | null>(null);
  const [showStepModal, setShowStepModal] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(shootData.config);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setShootData({ ...shootData, config: items });
  };

  const addNewStep = () => {
    const newStep: ShootStep = {
      quality: false,
      optional: false,
      typeImage: 0,
      retry: 2,
      showHelp: true,
      urlThumb: '',
      title: {
        name: '',
        localization: [{ locale: 'en', title: '' }]
      },
      help: {
        localization: [{ locale: 'en', title: null, content: '' }]
      }
    };
    setEditingStep({ step: newStep, index: -1 });
    setShowStepModal(true);
    setActiveTab('general');
  };

  const editStep = (step: ShootStep, index: number) => {
    setEditingStep({ step: { ...step }, index });
    setShowStepModal(true);
    setActiveTab('general');
  };

  const saveStep = (step: ShootStep) => {
    if (editingStep) {
      const newConfig = [...shootData.config];
      if (editingStep.index === -1) {
        newConfig.push(step);
      } else {
        newConfig[editingStep.index] = step;
      }
      setShootData({ ...shootData, config: newConfig });
    }
    setShowStepModal(false);
    setEditingStep(null);
  };

  const deleteStep = (index: number) => {
    const newConfig = shootData.config.filter((_, i) => i !== index);
    setShootData({ ...shootData, config: newConfig });
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(shootData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${shootData.name || 'shoot-inspection'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setShootData(imported);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const StepEditModal = () => {
    if (!editingStep) return null;

    const [step, setStep] = useState<ShootStep>(editingStep.step);

    const updateStep = (updates: Partial<ShootStep>) => {
      setStep({ ...step, ...updates });
    };

    const addLocalization = (type: 'title' | 'help', locale: string) => {
      if (type === 'title') {
        const newLocalizations = [...step.title.localization];
        if (!newLocalizations.find(l => l.locale === locale)) {
          newLocalizations.push({ locale, title: '' });
          updateStep({
            title: { ...step.title, localization: newLocalizations }
          });
        }
      } else {
        const newLocalizations = [...step.help.localization];
        if (!newLocalizations.find(l => l.locale === locale)) {
          newLocalizations.push({ locale, title: null, content: '' });
          updateStep({
            help: { ...step.help, localization: newLocalizations }
          });
        }
      }
    };

    const updateLocalization = (type: 'title' | 'help', locale: string, field: string, value: string) => {
      if (type === 'title') {
        const newLocalizations = step.title.localization.map(l =>
          l.locale === locale ? { ...l, [field]: value } : l
        );
        updateStep({
          title: { ...step.title, localization: newLocalizations }
        });
      } else {
        const newLocalizations = step.help.localization.map(l =>
          l.locale === locale ? { ...l, [field]: value || null } : l
        );
        updateStep({
          help: { ...step.help, localization: newLocalizations }
        });
      }
    };

    const removeLocalization = (type: 'title' | 'help', locale: string) => {
      if (type === 'title') {
        const newLocalizations = step.title.localization.filter(l => l.locale !== locale);
        if (newLocalizations.length > 0) {
          updateStep({
            title: { ...step.title, localization: newLocalizations }
          });
        }
      } else {
        const newLocalizations = step.help.localization.filter(l => l.locale !== locale);
        if (newLocalizations.length > 0) {
          updateStep({
            help: { ...step.help, localization: newLocalizations }
          });
        }
      }
    };

    return (
      <Modal
        isOpen={showStepModal}
        onClose={() => setShowStepModal(false)}
        title={editingStep.index === -1 ? "Create New Step" : "Edit Step"}
        size="xl"
      >
        <div className="space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'general', label: 'General Settings' },
                { key: 'localization', label: 'Localization' },
                { key: 'overlay', label: 'Overlay & Constraints' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Step Name"
                value={step.title.name}
                onChange={(e) => updateStep({
                  title: { ...step.title, name: e.target.value }
                })}
                placeholder="Enter step name"
              />
              <Input
                label="Angle"
                type="number"
                value={step.angle?.toString() || ''}
                onChange={(e) => updateStep({ angle: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Enter angle"
              />
              <Input
                label="Thumbnail URL"
                value={step.urlThumb}
                onChange={(e) => updateStep({ urlThumb: e.target.value })}
                placeholder="Enter thumbnail URL"
              />
              <Input
                label="Retry Count"
                type="number"
                value={step.retry.toString()}
                onChange={(e) => updateStep({ retry: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type Image</label>
                <select
                  value={step.typeImage}
                  onChange={(e) => updateStep({ typeImage: parseInt(e.target.value) })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {typeImageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Type</label>
                <select
                  value={
                    step.typeImage === 0 ? 'exterior' :
                    step.typeImage === 3 ? 'interior' : 'additional'
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'exterior') {
                      updateStep({ 
                        typeImage: 0,
                        typeExterior: step.typeExterior || 0,
                        typeInterior: undefined,
                        typeAdditional: undefined
                      });
                    } else if (value === 'interior') {
                      updateStep({ 
                        typeImage: 3,
                        typeInterior: step.typeInterior || 0,
                        typeExterior: undefined,
                        typeAdditional: undefined
                      });
                    } else {
                      updateStep({ 
                        typeImage: 1,
                        typeAdditional: step.typeAdditional || 0,
                        typeExterior: undefined,
                        typeInterior: undefined
                      });
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {stepTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={step.optional}
                    onChange={(e) => updateStep({ optional: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Optional</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={step.quality}
                    onChange={(e) => updateStep({ quality: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Activate Quality</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={step.showHelp}
                    onChange={(e) => updateStep({ showHelp: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Help</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={step.runDetection || false}
                    onChange={(e) => updateStep({ runDetection: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Run Detection</span>
                </label>
              </div>
            </div>
          )}

          {/* Localization Tab */}
          {activeTab === 'localization' && (
            <div className="space-y-6">
              {/* Title Localizations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Title Localizations</h4>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addLocalization('title', e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Add Language</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  {step.title.localization.map((loc, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <select
                        value={loc.locale}
                        onChange={(e) => {
                          const newLocalizations = [...step.title.localization];
                          newLocalizations[index] = { ...loc, locale: e.target.value };
                          updateStep({
                            title: { ...step.title, localization: newLocalizations }
                          });
                        }}
                        className="w-32 text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={loc.title}
                        onChange={(e) => updateLocalization('title', loc.locale, 'title', e.target.value)}
                        placeholder="Enter title"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {step.title.localization.length > 1 && (
                        <button
                          onClick={() => removeLocalization('title', loc.locale)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Localizations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Help Localizations</h4>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addLocalization('help', e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Add Language</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {step.help.localization.map((loc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <select
                          value={loc.locale}
                          onChange={(e) => {
                            const newLocalizations = [...step.help.localization];
                            newLocalizations[index] = { ...loc, locale: e.target.value };
                            updateStep({
                              help: { ...step.help, localization: newLocalizations }
                            });
                          }}
                          className="w-32 text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={loc.title || ''}
                          onChange={(e) => updateLocalization('help', loc.locale, 'title', e.target.value)}
                          placeholder="Enter help title"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {step.help.localization.length > 1 && (
                          <button
                            onClick={() => removeLocalization('help', loc.locale)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={loc.content || ''}
                        onChange={(e) => updateLocalization('help', loc.locale, 'content', e.target.value)}
                        placeholder="Enter help content"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overlay & Constraints Tab */}
          {activeTab === 'overlay' && (
            <div className="space-y-4">
              <Input
                label="Overlay URL"
                value={step.overlay?.url || ''}
                onChange={(e) => updateStep({
                  overlay: {
                    url: e.target.value,
                    constraints: step.overlay?.constraints || {
                      portrait: { position: 0, scaleType: 0, marginStart: true, marginEnd: true },
                      landscape: { position: 0, scaleType: 0, marginStart: true, marginEnd: true }
                    }
                  }
                })}
                placeholder="Enter overlay URL"
              />
              
              {step.overlay?.url && (
                <div className="grid grid-cols-2 gap-6">
                  {/* Portrait Constraints */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Portrait Constraints</h5>
                    <div className="space-y-3">
                      <Input
                        label="Position"
                        type="number"
                        value={step.overlay?.constraints.portrait.position.toString() || '0'}
                        onChange={(e) => updateStep({
                          overlay: {
                            ...step.overlay!,
                            constraints: {
                              ...step.overlay!.constraints,
                              portrait: {
                                ...step.overlay!.constraints.portrait,
                                position: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        })}
                      />
                      <Input
                        label="Scale Type"
                        type="number"
                        value={step.overlay?.constraints.portrait.scaleType.toString() || '0'}
                        onChange={(e) => updateStep({
                          overlay: {
                            ...step.overlay!,
                            constraints: {
                              ...step.overlay!.constraints,
                              portrait: {
                                ...step.overlay!.constraints.portrait,
                                scaleType: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        })}
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.overlay?.constraints.portrait.marginStart || false}
                          onChange={(e) => updateStep({
                            overlay: {
                              ...step.overlay!,
                              constraints: {
                                ...step.overlay!.constraints,
                                portrait: {
                                  ...step.overlay!.constraints.portrait,
                                  marginStart: e.target.checked
                                }
                              }
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 shadow-sm"
                        />
                        <span className="ml-2 text-sm text-gray-700">Margin Start</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.overlay?.constraints.portrait.marginEnd || false}
                          onChange={(e) => updateStep({
                            overlay: {
                              ...step.overlay!,
                              constraints: {
                                ...step.overlay!.constraints,
                                portrait: {
                                  ...step.overlay!.constraints.portrait,
                                  marginEnd: e.target.checked
                                }
                              }
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 shadow-sm"
                        />
                        <span className="ml-2 text-sm text-gray-700">Margin End</span>
                      </label>
                    </div>
                  </div>

                  {/* Landscape Constraints */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Landscape Constraints</h5>
                    <div className="space-y-3">
                      <Input
                        label="Position"
                        type="number"
                        value={step.overlay?.constraints.landscape.position.toString() || '0'}
                        onChange={(e) => updateStep({
                          overlay: {
                            ...step.overlay!,
                            constraints: {
                              ...step.overlay!.constraints,
                              landscape: {
                                ...step.overlay!.constraints.landscape,
                                position: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        })}
                      />
                      <Input
                        label="Scale Type"
                        type="number"
                        value={step.overlay?.constraints.landscape.scaleType.toString() || '0'}
                        onChange={(e) => updateStep({
                          overlay: {
                            ...step.overlay!,
                            constraints: {
                              ...step.overlay!.constraints,
                              landscape: {
                                ...step.overlay!.constraints.landscape,
                                scaleType: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        })}
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.overlay?.constraints.landscape.marginStart || false}
                          onChange={(e) => updateStep({
                            overlay: {
                              ...step.overlay!,
                              constraints: {
                                ...step.overlay!.constraints,
                                landscape: {
                                  ...step.overlay!.constraints.landscape,
                                  marginStart: e.target.checked
                                }
                              }
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 shadow-sm"
                        />
                        <span className="ml-2 text-sm text-gray-700">Margin Start</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.overlay?.constraints.landscape.marginEnd || false}
                          onChange={(e) => updateStep({
                            overlay: {
                              ...step.overlay!,
                              constraints: {
                                ...step.overlay!.constraints,
                                landscape: {
                                  ...step.overlay!.constraints.landscape,
                                  marginEnd: e.target.checked
                                }
                              }
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 shadow-sm"
                        />
                        <span className="ml-2 text-sm text-gray-700">Margin End</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setShowStepModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveStep(step)}>
              Save Step
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shoot Inspection Configuration</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="ID"
            value={shootData.id}
            onChange={(e) => setShootData({ ...shootData, id: e.target.value })}
            placeholder="Enter shoot inspection ID"
          />
          <Input
            label="Name"
            value={shootData.name}
            onChange={(e) => setShootData({ ...shootData, name: e.target.value })}
            placeholder="Enter shoot inspection name"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={shootData.description}
              onChange={(e) => setShootData({ ...shootData, description: e.target.value })}
              placeholder="Enter shoot inspection description"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* JSON Import/Export */}
        <div className="flex gap-4 mt-4">
          <Button variant="secondary" className="flex items-center gap-2" onClick={exportJSON}>
            <Download size={16} />
            Download JSON
          </Button>
          <label className="cursor-pointer">
            <Button variant="secondary" className="flex items-center gap-2" type="button">
              <Upload size={16} />
              Upload JSON
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Steps Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Inspection Steps</h3>
          <Button onClick={addNewStep} className="flex items-center gap-2">
            <Plus size={16} />
            Add Step
          </Button>
        </div>

        {shootData.config.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No steps configured yet. Click "Add Step" to start building your inspection flow.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="steps">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {shootData.config.map((step, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical size={16} className="text-gray-400" />
                          </div>
                          
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {step.urlThumb ? (
                              <img 
                                src={step.urlThumb} 
                                alt={step.title.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-medium text-gray-900">Step {index + 1}</span>
                              <h4 className="font-medium text-gray-900">{step.title.name || 'Unnamed Step'}</h4>
                              <div className="flex gap-2">
                                {step.optional && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                    Optional
                                  </span>
                                )}
                                {step.quality && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Quality
                                  </span>
                                )}
                                {step.runDetection && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                    Detection
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {step.angle && <span>Angle: {step.angle}</span>}
                              <span>Retry: {step.retry}</span>
                              <span>Type: {
                                step.typeImage === 0 ? 'Standard' :
                                step.typeImage === 3 ? 'Interior' : 'Additional'
                              }</span>
                              <span>Languages: {step.title.localization.length}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => editStep(step, index)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => deleteStep(index)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(shootData)} disabled={!shootData.name || shootData.config.length === 0}>
          Save Shoot Inspection Block
        </Button>
      </div>

      <StepEditModal />
    </div>
  );
}