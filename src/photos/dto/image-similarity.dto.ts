import { PhotoDataDto } from "./photo-data.dto";

export interface ImageSimilarityDto {
  imageName: string;
  similarity: number;
  data?: PhotoDataDto;
}
