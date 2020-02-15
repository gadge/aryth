import { Num, NumLoose } from 'typen'

export const ToNum = (level = 0) => {
  switch (level) {
    case 0:
      return x => x
    case 1:
      return NumLoose.numeric
    case 2:
    default:
      return Num.numeric
  }
}
