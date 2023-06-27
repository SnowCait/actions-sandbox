import fs from 'fs/promises';
import domains from './nostr-bot-domains.json' assert { type: 'json' }

const pubkeys = [];
for (const domain of domains) {
    console.log(domain);
    const url = new URL(`https://${domain}/.well-known/nostr.json`);
    const response = await fetch(url);
    const json = await response.json();
    pubkeys.push(...Object.entries(json.names).map(([,pubkey]) => pubkey));
}
console.log(pubkeys);

await fs.writeFile('nostr-bots.json', JSON.stringify(pubkeys, null, 2));
