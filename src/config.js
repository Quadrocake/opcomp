const Config = {
	BACKEND_URL: "https://op.bots.confa.pp.ua/api",
	BASE_RANDOM_ANIME_REQUEST: "https://staging.animethemes.moe/api/anime?sort=random" + 
		"&page[size]=1&filter[has]=animethemeentries",
	ANIME_FIELDS: "&fields[anime]=id,name,year" + 
		"&fields[video]=id,link" + 
		"&fields[animetheme]=type,slug" + 
		"&fields[song]=title" + 
		"&fields[animethemeentry]=spoiler" + 
		"&include=animethemes.animethemeentries.videos,animethemes.song",
	BASE_SEARCH_URL:  "https://staging.animethemes.moe/api/search?fields[search]=anime" + 
		"&page[limit]=5&filter[has]=animethemeentries",
	BASE_YT_SEARCH_URL: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDxgb25TunfttfRHSG1zhOGxTjNh-vvFEA&maxResults=5&q="
}
export default Config
  