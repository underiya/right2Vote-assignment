class Instrument {
  constructor(weight, volume, value) {
    this.weight = weight;
    this.volume = volume;
    this.value = value;
  }
}

function selectOptimalInstrument(instruments, maxWeight, maxVolume) {
  const n = instruments.length;
  const dp = new Array(maxWeight + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const { weight, volume, value } = instruments[i];

    for (let w = maxWeight; w >= weight; w--) {
      for (let v = maxVolume; v >= volume; v--) {
        const newVal = dp[w - weight] + value;
        if (newVal > dp[w]) {
          dp[w] = newVal;
        }
      }
    }
  }

  let totalWeight = 0;
  let totalVolume = 0;
  let selectedInstrument = [];

  let w = maxWeight;
  for (let i = 0; i < n; i++) {
    const { weight, volume, value } = instruments[i];
    if (w >= weight && dp[w] === dp[w - weight] + value) {
      selectedInstrument.push({ ...instruments[i] });
      totalWeight += weight;
      totalVolume += volume;
      w -= weight;
    }
  }

  return {
    selectedInstrument,
    totalWeight,
    totalVolume,
    totalValue: dp[maxWeight],
  };
}

const instruments = [
  new Instrument(3, 2, 10),
  new Instrument(4, 3, 15),
  new Instrument(2, 1, 8),
  new Instrument(5, 4, 20),
];

let res = selectOptimalInstrument(instruments, 10, 7);
console.log(res);
