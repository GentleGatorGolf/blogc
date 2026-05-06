import { Injectable, signal } from '@angular/core';
import { VideoTutorial } from '../models/video-tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  #videos = signal<VideoTutorial[]>([
        {
      youtubeId: '35f40d1f-a38d-470a-adea-81c6a7d6b270',
      title: 'Grip',
      description: 'Gripping the club correctly and consistently is your first step to a more consistent ball flight',
    },
    {
      youtubeId: '5fc66aa5-0b0f-424f-be8d-dd72695104b7',
      title: 'Driver: Pre Shot Routine',
      description: 'How to walk into a shot like a pro and not only aim your body but your mind',
    },
    {
      youtubeId: '45d32b3d-a5e8-48f3-8e6f-afdd2c042b44',
      title: 'Driver: Ball Position (Front View)',
      description: 'Take the guesswork out of how far up in your stance the ball should be.',
    },
    {
      youtubeId: '24084f17-aa52-4a8d-9aac-7e41027e1b63',
      title: 'Driver: Ball Position (Side View)',
      description: 'Being incosistent with distance to the ball changes the club path. Learn how to find the middle ground and be consistent',
    },
    {
      youtubeId: '94f68a39-803b-4da3-8b3b-251a2fdab22c',
      title: 'Driver: Face Checkpoints',
      description: 'Practice the three critical face check points and get instant feedback',
    },
    {
      youtubeId: '28d4a2a0-1c05-4052-b17f-aa3a8d3694aa',
      title: 'Iron: Ball Position(Front View)',
      description: 'Side Hill lies can be tricky. Learn how to adjust your stance and swing to make solid contact and control your ball flight.',
    },
    {
      youtubeId: 'd68ec3b1-fd2c-47a0-be9c-91bfc6a06406',
      title: 'Ball Position (Side View)',
      description: 'Side Hill lies can be tricky. Learn how to adjust your stance and swing to make solid contact and control your ball flight.',
    },
    {
      youtubeId: '84c04ad8-3da9-45bf-9532-e98393ea5c0c',
      title: 'Iron: Side Hill Lies',
      description: 'Side Hill lies can be tricky. Learn how to adjust your stance and swing to make solid contact and control your ball flight.',
    },
    {
      youtubeId: '3a909a6e-d7de-4a0a-a990-6a0cc47e10bc',
      title: 'Iron: Up/Down Hill Lies',
      description: 'Up/Down hill lies can really mess up your scorecard. Here is how to attack them.',
    },
    {
      youtubeId: 'e0e200f9-a09c-498e-b4b1-749813fbcd7f',
      title: 'Iron: Face Checkpoints',
      description: 'Practice the three critical face check points and get instant feedback',
    }
  ]);

  public readonly videos = this.#videos.asReadonly();
}
