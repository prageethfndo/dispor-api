import { writeFileSync } from "fs";

const sample = {
        id: 4,
        title: "50 bottels for sale in pannipitiya",
        amount: 50,
        price: 500.0,
        status: "active",
        maxBid: 5600,
        date: new Date().toLocaleDateString(),
};

let id = 0;

const itemNames = ["bottles", "tires", "cardboard boxes", "electronic parts"];
const amounts = [10, 20, 30, 40];

const generatedItems = [];

for (let i = 0; i < 30; i++) {
        const name = pickRandomItem(itemNames);
        const amount = pickRandomItem(amounts);
        const price = amount * Math.random() * 10;
        const status = "active";
        const maxBid = amount * Math.random() * 5;
        const date = new Date().toLocaleDateString();

        generatedItems.push({
                id: i + 1,
                title: `${amount} ${name} for sale`,
                price: price.toFixed(2),
                status,
                maxBid: maxBid.toFixed(2),
                date,
        });
}

writeFileSync("data.json", JSON.stringify(generatedItems));

function pickRandomItem(arr: Array<any>) {
        return arr[Math.floor(Math.random() * arr.length)];
}
