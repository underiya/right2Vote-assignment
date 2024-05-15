class Instrument {
  constructor(weight, volume, value) {
    this.weight = weight;
    this.volume = volume;
    this.value = value;
  }
}

// const instruments = [
//   new Instrument(3, 2, 10),
//   new Instrument(4, 3, 15),
//   new Instrument(2, 1, 8),
//   new Instrument(5, 4, 20),
// ];

// let res = selectOptimalInstrument(instruments, 10, 7);
// console.log(res);

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
  //   console.log(dp);

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

document.getElementById("runButton").addEventListener("click", () => {
  const instruments = [
    new Instrument(3, 2, 10), // Instrument 1
    new Instrument(4, 3, 15), // Instrument 2
    new Instrument(2, 1, 8), // Instrument 3
    new Instrument(5, 4, 20), // Instrument 4
  ];

  const maxPayload = 10; // kg
  const maxVolume = 7; // m^3

  const result = selectOptimalInstrument(instruments, maxPayload, maxVolume);
  console.log(result);
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<h2>Selected Instruments:</h2>`;
  result.selectedInstrument.forEach((instrument, index) => {
    resultsDiv.innerHTML += `<p><strong>Instrument ${
      index + 1
    }:</strong> weight=${instrument.weight} kg, volume=${
      instrument.volume
    } m^3, value=${instrument.value}</p>`;
  });
  resultsDiv.innerHTML += `<p><strong>Total Weight:</strong> ${result.totalWeight} kg</p>`;
  resultsDiv.innerHTML += `<p><strong>Total Volume:</strong> ${result.totalVolume} m^3</p>`;
  resultsDiv.innerHTML += `<p><strong>Total Scientific Value:</strong> ${result.totalValue}</p>`;
});
