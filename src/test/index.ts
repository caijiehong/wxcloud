import { getAccessToken } from "../business/wx";
async function main() {
  const res = await getAccessToken(
    "wx0b0952e4cf2f0158",
    "680101da492d624a2f97b689ed0c23da1"
  );

  console.log(res);
}

main();
