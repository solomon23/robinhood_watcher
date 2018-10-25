export function getSMA() {
  return Promise.resolve([
    { marketOpen: 10, label: '1 PM', marketClose: 12, average: 12 },
  ])
}

export function getSettings() {
  return { refreshInterval: 1, viewChangeBy: 'TOTAL', notifyPercent: 100 }
}

export default {
  getSMA,
}
