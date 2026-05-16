const fs = require('fs');

try {
    const raw = fs.readFileSync('wolt_data_raw.txt', 'utf8');
    const startIdx = raw.indexOf('{"props":');
    const endIdx = raw.lastIndexOf('}</script>') + 1;
    
    if (startIdx !== -1) {
        const jsonStr = raw.substring(startIdx, raw.length).trim().replace(/<\/script>.*$/, '');
        const data = JSON.parse(jsonStr);
        const menu = data.props.pageProps.venueResponse.venue.menu.items;
        
        const simplifiedMenu = menu.map(item => ({
            name: item.name,
            description: item.description,
            price: (item.base_price / 100).toFixed(2) + ' ₼',
            image: item.image_url
        }));
        
        fs.writeFileSync('menu_data.json', JSON.stringify(simplifiedMenu, null, 2));
        console.log('Successfully extracted ' + simplifiedMenu.length + ' items');
    } else {
        console.log('Could not find start of JSON props');
        console.log('Snippet: ' + raw.substring(0, 500));
    }
} catch (e) {
    console.error('Error: ' + e.message);
}
