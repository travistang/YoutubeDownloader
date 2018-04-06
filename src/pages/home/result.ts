export default class SearchResult {
    name: string;
    id: string;
    duration: string;
    thumbnail: string;

    constructor(name: string, id: string, duration: string, thumbnail: string) {
    	this.name = name
    	this.id = id
    	this.duration = duration
    	this.thumbnail = thumbnail
    }
}
