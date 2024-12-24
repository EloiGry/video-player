"use server";

import fs from 'fs-extra'; 
import path from 'path';


const filePath = path.join(process.cwd(), 'src/data', 'videos.json');

//Read Videos
export const readVideos = async (): Promise<any[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data); 
  } catch (error) {
    console.error('Error reading videos file:', error);
    return []; 
  }
};

//Read One Video
export const readVideoBySlug = async (slug: string): Promise<any | null> => {
    try {
      const videos = await readVideos();  // Utilise la fonction précédente pour lire toutes les vidéos
      return videos.find((video) => video.slug === slug) || null;
    } catch (error) {
      console.error('Error reading video by ID:', error);
      return null;
    }
  };

// Write Videos
export const writeVideos = async (videos: any[]): Promise<void> => {
  try {
    await fs.writeFile(filePath, JSON.stringify(videos, null, 2)); 
  } catch (error) {
    console.error('Error writing to videos file:', error);
  }
};