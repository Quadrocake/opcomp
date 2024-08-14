const Config = {
	BACKEND_URL: "https://op.727.pp.ua/api",
	CORS_URL: "http://op.727.pp.ua/cors?url=",
	//BACKEND_URL: "http://192.168.0.60:5000/api",
	//CORS_URL: "http://192.168.0.60:5000/cors?url=",
	BASE_RANDOM_ANIME_REQUEST: "https://api.animethemes.moe/anime?sort=random" + 
		"&page[size]=1",
	ANIME_FIELDS: "&fields[anime]=id,name,year" + 
		"&fields[video]=id,link" + 
		"&fields[animetheme]=type,slug" + 
		"&fields[song]=title" + 
		"&fields[animethemeentry]=spoiler" +
		"&fields[artist]=name",
	RANDOM_INCLUDE: "&include=animethemes.song,animethemes.animethemeentries.videos,animethemes.song.artists,resources",
	SEARCH_INCLUDE: "&include[anime]=animethemes.song,animethemes.animethemeentries.videos,animethemes.song.artists",
	BASE_SEARCH_URL:  "https://api.animethemes.moe/search?fields[search]=anime" + 
		"&page[limit]=10",
	BASE_YT_SEARCH_URL: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDxgb25TunfttfRHSG1zhOGxTjNh-vvFEA&maxResults=10&q=",
	MAL_URL: "https://api.myanimelist.net/v2/anime/",
	MAL_FIELDS: "?fields=title,mean,rank,popularity,num_list_users,num_scoring_users"
}
export default Config
  
