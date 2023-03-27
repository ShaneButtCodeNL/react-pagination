const ROLES = [
  "Manager",
  "Stocker",
  "Cleaner",
  "Cashier",
  "GroundsKeeper",
  "Guard",
];

function makeName(n) {
  return `Name-${n}`;
}

function makeAge() {
  let r = Math.random();
  return 20 + Math.floor(30 * r);
}

function makeRole() {
  return ROLES[Math.floor(ROLES.length * Math.random())];
}
/**
 *
 * @param {number} count
 */
export default function makeList(count) {
  let list = Array.from({ length: count }, (_, i) => {
    return {
      id: i + 100,
      name: makeName(i),
      age: makeAge(),
      role: makeRole(),
    };
  });
  return list;
}
