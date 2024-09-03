export const PushUpsValue = {
  oneWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [2, 3, 2, 2, 3],
      twoStep: [6, 6, 4, 4, 5],
      threeStep: [10, 12, 7, 7, 9],
    },
    twoDay: {
      restTime: 90,
      oneStep: [3, 4, 2, 3, 4],
      twoStep: [6, 8, 6, 6, 7],
      threeStep: [10, 12, 8, 8, 12],
    },
    threeDay: {
      restTime: 120,
      oneStep: [4, 5, 4, 4, 5],
      twoStep: [8, 10, 7, 7, 10],
      threeStep: [11, 15, 9, 9, 13],
    },
  },
  twoWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [4, 6, 4, 4, 6],
      twoStep: [9, 11, 8, 8, 11],
      threeStep: [14, 14, 10, 10, 15],
    },
    twoDay: {
      restTime: 90,
      oneStep: [5, 6, 4, 4, 7],
      twoStep: [10, 12, 9, 9, 13],
      threeStep: [14, 16, 12, 12, 17],
    },
    threeDay: {
      restTime: 120,
      oneStep: [5, 7, 5, 5, 8],
      twoStep: [12, 13, 10, 10, 15],
      threeStep: [16, 17, 14, 14, 20],
    },
  },
  threeWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [10, 12, 7, 7, 9],
      twoStep: [12, 17, 13, 13, 17],
      threeStep: [14, 18, 14, 14, 20],
    },
    twoDay: {
      restTime: 90,
      oneStep: [10, 12, 8, 8, 12],
      twoStep: [14, 19, 14, 14, 19],
      threeStep: [20, 25, 15, 15, 25],
    },
    threeDay: {
      restTime: 120,
      oneStep: [11, 13, 9, 9, 13],
      twoStep: [16, 21, 15, 15, 21],
      threeStep: [22, 30, 20, 20, 28],
    },
  },
  fourWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [12, 14, 11, 10, 16],
      twoStep: [18, 22, 16, 16, 25],
      threeStep: [21, 25, 21, 21, 32],
    },
    twoDay: {
      restTime: 90,
      oneStep: [14, 16, 12, 12, 18],
      twoStep: [20, 25, 20, 20, 28],
      threeStep: [25, 29, 25, 25, 36],
    },
    threeDay: {
      restTime: 120,
      oneStep: [16, 18, 13, 13, 20],
      twoStep: [23, 28, 23, 23, 33],
      threeStep: [29, 33, 29, 29, 40],
    },
  },
  fiveWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [17, 19, 15, 15, 20],
      twoStep: [28, 35, 25, 22, 35],
      threeStep: [36, 40, 30, 24, 40],
    },
    twoDay: {
      restTime: 45,
      oneStep: [10, 10, 13, 13, 10, 10, 9, 25],
      twoStep: [18, 18, 20, 20, 17, 17, 20, 40],
      threeStep: [19, 19, 22, 22, 18, 18, 22, 45],
    },
    threeDay: {
      restTime: 45,
      oneStep: [13, 13, 15, 15, 12, 12, 10, 30],
      twoStep: [18, 18, 20, 20, 17, 17, 20, 45],
      threeStep: [20, 20, 24, 24, 20, 20, 22, 50],
    },
  },
  sixWeek: {
    oneDay: {
      restTime: 60,
      oneStep: [25, 30, 20, 15, 40],
      twoStep: [40, 50, 25, 25, 50],
      threeStep: [45, 55, 35, 30, 55],
    },
    twoDay: {
      restTime: 45,
      oneStep: [14, 14, 15, 15, 14, 14, 10, 10, 44],
      twoStep: [20, 20, 23, 23, 20, 20, 18, 18, 53],
      threeStep: [22, 22, 30, 30, 24, 24, 18, 58],
    },
    threeDay: {
      restTime: 45,
      oneStep: [13, 13, 17, 17, 16, 16, 14, 14, 50],
      twoStep: [22, 22, 30, 30, 25, 25, 18, 18, 55],
      threeStep: [26, 26, 33, 33, 26, 26, 22, 22, 60],
    },
  },
} as const;
