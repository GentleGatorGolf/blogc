export interface VideoTutorial {
  /** The unique YouTube video ID. */
  youtubeId: string;

  /** The title of the tutorial. */
  title: string;

  /** A brief description of the video content. */
  description: string;
  /** Optional key bullet points shown with the video. */
  keyPoints?: string[];
}
