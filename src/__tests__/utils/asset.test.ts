import { TAsset } from "types/asset";
import { extractAssetData } from "../../utils/asset";
import { MediaItem } from "types/section";

describe("extractAssetData", () => {
  test("should extract data from asset with media", () => {
    const asset: TAsset & MediaItem = {
      id: "1",
      name: "Sample Image",
      file: {
        url: "https://example.com/sample.jpg",
        contentType: "image/jpeg",
      },
      gatsbyImageData: {
        height: 300,
        width: 300,
        alt: "Sample Image",
        image: {
          images: {
            fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
          },
          layout: "constrained",
          width: 800,
          height: 600,
        },
      },
      publicUrl: "https://example.com/sample.jpg",
      title: "Sample Image Title",
      media: {
        id: "2",
        file: {
          url: "https://example.com/sample.jpg",
          contentType: "image/jpeg",
        },
        gatsbyImageData: {
          height: 300,
          width: 300,
          alt: "Sample Image",
          image: {
            images: {
              fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
            },
            layout: "constrained",
            width: 800,
            height: 600,
          },
        },
        publicUrl: "https://example.com/sample.jpg",
        title: "Sample Image Title",
      },
      youtubeLink: "https://youtube.com/video1",
    };

    const result = extractAssetData(asset);
    expect(result).toEqual({
      media: asset.media,
      url: "https://example.com/sample.jpg",
      title: "Sample Image",
      contentType: "image/jpeg",
      videoURL: "https://youtube.com/video1",
    });
  });

  test("should extract data from asset without media", () => {
    const asset: TAsset & MediaItem = {
      id: "1",
      name: "Sample Video",
      file: {
        url: "https://example.com/sample.mp4",
        contentType: "video/mp4",
      },
      gatsbyImageData: {
        height: 200,
        width: 200,
        alt: "Sample Video",
        image: {
          images: {
            fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
          },
          layout: "constrained",
          width: 800,
          height: 600,
        },
      },
      publicUrl: "https://example.com/sample.mp4",
      title: "Sample Video Title",
      youtubeLink: "https://youtube.com/video2",
    };

    const result = extractAssetData(asset);
    expect(result).toEqual({
      media: asset,
      url: "https://example.com/sample.mp4",
      title: "Sample Video",
      contentType: "video/mp4",
      videoURL: "https://youtube.com/video2",
    });
  });

  test("should return video URL if youtubeVideoURL is provided", () => {
    const asset: TAsset & MediaItem = {
      id: "1",
      name: "Sample Video",
      file: {
        url: "https://example.com/sample.mp4",
        contentType: "video/mp4",
      },
      gatsbyImageData: {
        height: 300,
        width: 300,
        alt: "Sample Image",
        image: {
          images: {
            fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
          },
          layout: "constrained",
          width: 800,
          height: 600,
        },
      },
      youtubeLink: "https://youtube.com/video4",
      publicUrl: "https://example.com/sample.jpg",
      title: "Sample Image Title",
    };
    const youtubeVideoURL = "https://youtube.com/video4";

    const result = extractAssetData(asset, youtubeVideoURL);
    expect(result.videoURL).toBe("https://youtube.com/video4");
  });

  test("should return youtubeLink if youtubeVideoURL is not provided", () => {
    const asset: TAsset & MediaItem = {
      id: "1",
      name: "Sample Video",
      file: {
        url: "https://example.com/sample.mp4",
        contentType: "video/mp4",
      },
      publicUrl: "https://example.com/sample.jpg",
      title: "Sample Image Title",
      gatsbyImageData: {
        height: 300,
        width: 300,
        alt: "Sample Image",
        image: {
          images: {
            fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
          },
          layout: "constrained",
          width: 800,
          height: 600,
        },
      },
      youtubeLink: "https://youtube.com/video3",
    };

    const result = extractAssetData(asset);
    expect(result.videoURL).toBe("https://youtube.com/video3");
  });

  test("should work with a media object containing only the necessary fields", () => {
    const asset: TAsset & MediaItem = {
      id: "1",
      file: {
        url: "https://example.com/media.jpg",
        contentType: "",
      },
      gatsbyImageData: {
        height: 300,
        width: 300,
        alt: "Sample Image",
        image: {
          images: {
            fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
          },
          layout: "constrained",
          width: 800,
          height: 600,
        },
      },
      media: {
        id: "2",
        file: {
          url: "https://example.com/media.jpg",
          contentType: "",
        },
        gatsbyImageData: {
          height: 300,
          width: 300,
          alt: "Sample Image",
          image: {
            images: {
              fallback: { src: "https://example.com/image.jpg", srcSet: "..." },
            },
            layout: "constrained",
            width: 800,
            height: 600,
          },
        },
        publicUrl: "https://example.com/sample.jpg",
        title: "Sample Image Title",
      },
      publicUrl: "https://example.com/sample.jpg",
      title: "",
    };

    const result = extractAssetData(asset);
    expect(result).toEqual({
      media: asset.media,
      url: "https://example.com/media.jpg",
      title: "", 
      contentType: "", 
      videoURL: "", 
    });
  });
});
