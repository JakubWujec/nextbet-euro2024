import { db } from "../db";

const STANDINGS_UPDATE_KEY = 'standings_update'

async function getLastStandingsUpdateDate() {
    const obj = await db.system.findFirst({
        where: {
            key: STANDINGS_UPDATE_KEY
        }
    })

    if (!obj?.value) {
        return null;
    }

    const json = JSON.parse(JSON.stringify(obj.value));

    return new Date(json.lastUpdated);
}

async function updateLastStandingsUpdateDate(_date?: Date) {
    const date = _date ?? new Date();
    await db.system.upsert({
        where: {
            key: STANDINGS_UPDATE_KEY,
        },
        update: {
            value: {
                lastUpdated: date
            }
        },
        create: {
            key: STANDINGS_UPDATE_KEY,
            value: {
                lastUpdated: date
            }
        }
    })

}

export {
    updateLastStandingsUpdateDate,
    getLastStandingsUpdateDate
}