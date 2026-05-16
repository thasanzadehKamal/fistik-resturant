const fs = require('fs');

try {
    const html = fs.readFileSync('wolt_page.html', 'utf8');
    // Look for any large JSON object
    const matches = html.match(/\{"props":\{.*\}\}/g);
    
    if (matches && matches.length > 0) {
        console.log('Found ' + matches.length + ' possible JSON objects');
        for (let i = 0; i < matches.length; i++) {
            try {
                const data = JSON.parse(matches[i]);
                if (data.props && data.props.pageProps) {
                    const venue = data.props.pageProps.venueResponse || data.props.pageProps.venue;
                    if (venue && venue.venue && venue.venue.menu) {
                        const items = venue.venue.menu.items;
                        fs.writeFileSync('menu_data_found.json', JSON.stringify(items, null, 2));
                        console.log('Found menu in match ' + i + ' with ' + items.length + ' items');
                        process.exit(0);
                    }
                }
            } catch (e) {
                // Not valid JSON or wrong structure
            }
        }
    } else {
        console.log('No props JSON found via regex');
        // Let's try a different regex for any script content
        const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
        console.log('Found ' + (scripts ? scripts.length : 0) + ' scripts');
        if (scripts) {
            scripts.forEach((s, idx) => {
                if (s.includes('menu') && s.includes('items')) {
                    console.log('Script ' + idx + ' contains "menu" and "items"');
                }
            });
        }
    }
} catch (e) {
    console.error('Error: ' + e.message);
}
