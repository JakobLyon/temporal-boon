import axios from 'axios'

const RAID_NAME = "Sanctum of Domination";

const BLIZZ_API = "https://us.api.blizzard.com/data";
const AUTH_TOKEN = "Bearer USJy0zcCXZfXKZ2aomX3aWCDUhcPK4yM7u";

const instanceId = await axios
  .get(`${BLIZZ_API}/wow/journal-instance/index`, {
    params: {
      namespace: "static-us",
      locale: "en_US"
    },
    headers: {
      Authorization: AUTH_TOKEN,
    },
  })
  .then((res) =>
    res.data.instances.reduce(
      (instanceId, instance) => (instance.name == RAID_NAME ? instance.id : instanceId),
      0
    )
  )
  .catch((err) => console.log(err.message));

if (!instanceId) {
  throw new Error("Raid not found");
}

const encounters = await axios
  .get(`${BLIZZ_API}/wow/journal-instance/${instanceId}`, 
  {
    params: {
      namespace: 'static-us',
      locale: 'en_US'
    },
    headers: {
      Authorization: AUTH_TOKEN
    }
  }).then(res => res.data.encounters)
  .catch(err => console.log(err.message))

  console.log(encounters)