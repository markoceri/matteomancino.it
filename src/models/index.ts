export interface Podcast {
    meta: {
      title: string;
      description: string;
      subtitle: string;
      imageURL: string;
      lastUpdated: string;
      link: string;
      language: string;
      editor: string;
      author: string;
      summary: string;
      categories: string[];
      owner: {
        name: string;
        email: string;
      };
      explicit: boolean;
      complete: boolean;
      blocked: boolean;
    };
    tracks: Track[];
  }

  export interface Track {
    title: string;
    description: string;
    imageURL: string;
    pubDate: string;
    link: string;
    language: string;
    enclosure: {
      length: number;
      type: string;
      url: string;
    };
    duration: number;
    summary: string;
    blocked: boolean;
    explicit: boolean;
    order: number;
    guid: string;
  }