import { PrizeConfig } from './components/FortuneWheel/types'

const prizesImage: PrizeConfig[] = [
    {
      id: 1,
      value: 'Blue\'s value',
      weight: 1
    },
    {
      id: 2,
      value: 'Red\'s value',
      weight: 0
    },
    {
      id: 3,
      value: 'Yellow\'s value',
      weight: 0
    }
  ]

 export const prizesCanvas: PrizeConfig[] = [
    {
      id: 1,
      name: '300',
      value: '300',
      bgColor: '#45ace9',
      color: '#ffffff',
      probability: 30
    },
    {
      id: 2,
      name: '400',
      value: '400',
      bgColor: '#dd3832',
      color: '#ffffff',
      probability: 40
    },
    {
      id: 3,
      name: '500',
      value: '500',
      bgColor: '#fef151',
      color: '#ffffff',
      probability: 30
    }
  ]