const fs = require('fs');

try {
    const html = fs.readFileSync('wolt_page.html', 'utf8');
    const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
    if (scripts && scripts[8]) {
        fs.writeFileSync('script_8.txt', scripts[8]);
        console.log('Saved script 8 to script_8.txt');
        
        // Try to find JSON inside it
        const jsonMatch = scripts[8].match(/\{.*\}/);
        if (jsonMatch) {
            try {
                // The script might be JS code that contains the JSON
                // Let's try to extract the JSON part specifically
                const content = jsonMatch[0];
                fs.writeFileSync('script_8_json_raw.txt', content);
            } catch (e) {}
        }
    }
} catch (e) {
    console.error('Error: ' + e.message);
}
