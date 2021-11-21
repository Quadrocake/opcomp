export function parseAnimeJson (json, index) {
    const parsedAnimeThemes = []
  
    for (let counter = 0; counter < json['anime'][index]['animethemes'].length; counter++) {
    const themeJson = {}

    themeJson['sourse'] = "themes"
    themeJson['type'] = json['anime'][index]['animethemes'][counter]['type']
    themeJson['year'] = json['anime'][index]['year']
    themeJson['title'] = json['anime'][index]['animethemes'][counter]['song']['title']
    themeJson['anime'] = json['anime'][index]['name']
    themeJson['animeId'] = json['anime'][index]['id']
    themeJson['opUrl'] = json['anime'][index]['animethemes'][counter]['animethemeentries'][0]['videos'][0]['link']
    themeJson['opId'] = json['anime'][index]['animethemes'][counter]['animethemeentries'][0]['videos'][0]['id']
    
    parsedAnimeThemes.push(themeJson)
    }
    return parsedAnimeThemes
}
export function filterAnimeThemesByType (animeThemes, type) {
    const filteredList = []
    if (type == 0) {
        return animeThemes
    }
    else {
        for (let counter = 0; counter < animeThemes.length; counter++) {
            if (type == 1) {
                if (animeThemes[counter]['type'] == "OP") {
                filteredList.push(animeThemes[counter])
                }
            }
            else if (type == 2) {
                if (animeThemes[counter]['type'] == "ED") {
                filteredList.push(animeThemes[counter])
                }
            }
        }
    }
    return filteredList
}