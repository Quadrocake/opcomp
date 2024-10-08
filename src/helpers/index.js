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
        if (json['anime'][index]['animethemes'][counter]['song']['artists'][0] != undefined) {
            const artistList = []
            for (let counter2 = 0; counter2 < json['anime'][index]['animethemes'][counter]['song']['artists'].length; counter2++) {
                artistList.push(json['anime'][index]['animethemes'][counter]['song']['artists'][counter2]['name'])
            }
            themeJson['artists'] = artistList
        }
        else {
            themeJson['artists'] = undefined
        }
        if (json['anime'][index]['resources'][0] != undefined) {
            for (let counter3 = 0; counter3 < json['anime'][index]['resources'].length; counter3++) {
                if (json['anime'][index]['resources'][counter3]['site'] == 'MyAnimeList') {
                    themeJson['malId'] = json['anime'][index]['resources'][counter3]['external_id']
                }
            }
        }
        else {
            themeJson['malId'] = undefined
        }
        
        parsedAnimeThemes.push(themeJson)
    }
    return parsedAnimeThemes
}
export function parseMALJson (json) {
    const MALObj = {}
    MALObj['title'] = json['title']
    MALObj['mean'] = json['mean']
    MALObj['rank'] = json['rank']
    MALObj['popularity'] = json['popularity']
    MALObj['num_list_users'] = json['num_list_users']
    MALObj['num_scoring_users'] = json['num_scoring_users']

    return MALObj
}
export function parseYtJson (json) {
    const parsedYtSearch = []

    for (const item in json) {
        const animeObj = {}
        animeObj['sourse'] = "yt"
        animeObj['anime'] = "YouTube"
        animeObj['opUrl'] = json[item]['id']['videoId']
        animeObj['title'] = json[item]['snippet']['title']
        animeObj['thumbnail'] = json[item]['snippet']['thumbnails']['default']['url']

        parsedYtSearch.push(animeObj)
    }
    return parsedYtSearch
}
export function parseMalJson (json) {
    const parsedMalList = []

    for (const item in json) {
        for (let counter = 0; counter < json[item]['themes'].length; counter++) {
            const animeObj = {}
            animeObj['sourse'] = "themes"
            animeObj['anime'] = json[item]['name']
            animeObj['year'] = json[item]['year']
            animeObj['title'] = json[item]['themes'][counter]['themeName']
            animeObj['opUrl'] = json[item]['themes'][counter]['mirror']['mirrorURL']

            parsedMalList.push(animeObj)
        }
    }
    return parsedMalList
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