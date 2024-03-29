const Config = {
	BACKEND_URL: "https://op.727.pp.ua/api",
	BASE_RANDOM_ANIME_REQUEST: "https://api.animethemes.moe/anime?sort=random" + 
		"&page[size]=1",
	ANIME_FIELDS: "&fields[anime]=id,name,year" + 
		"&fields[video]=id,link" + 
		"&fields[animetheme]=type,slug" + 
		"&fields[animethemeentry]=spoiler" +
		"&fields[artist]=name",
	RANDOM_INCLUDE: "&include=animethemes.song,animethemes.animethemeentries.videos,animethemes.song.artists",
	SEARCH_INCLUDE: "&include[anime]=animethemes.song,animethemes.animethemeentries.videos,animethemes.song.artists",
	BASE_SEARCH_URL:  "https://api.animethemes.moe/search?fields[search]=anime" + 
		"&page[limit]=10",
	BASE_YT_SEARCH_URL: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDxgb25TunfttfRHSG1zhOGxTjNh-vvFEA&maxResults=10&q="
}
export default Config
  
