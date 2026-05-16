const fs = require('fs');

try {
    const html = fs.readFileSync('wolt_page.html', 'utf8');
    const startStr = '<script id="__NEXT_DATA__" type="application/json">';
    const startIdx = html.indexOf(startStr);
    
    if (startIdx !== -1) {
        const jsonStart = startIdx + startStr.length;
        const endStr = '</script>';
        const endIdx = html.indexOf(endStr, jsonStart);
        
        if (endIdx !== -1) {
            const jsonStr = html.substring(jsonStart, endIdx);
            const data = JSON.parse(jsonStr);
            const menuItems = data.props.pageProps.venueResponse.venue.menu.items;
            
            const simplified = menuItems.map(item => ({
                name: item.name,
                description: item.description,
                price: (item.base_price / 100).toFixed(2) + ' ₼',
                image: item.image_url,
                slug: item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
            }));
            
            fs.writeFileSync('menu_data.json', JSON.stringify(simplified, null, 2));
            console.log('Successfully extracted ' + simplified.length + ' items');
        } else {
            console.log('Could not find end of script tag');
        }
    } else {
        console.log('Could not find __NEXT_DATA__ script tag');
        // Let's check a bit of the file to see why
        console.log('File size: ' + html.length);
        console.log('Start snippet: ' + html.substring(0, 500));
    }
} catch (e) {
    console.error('Error: ' + e.message);
}
