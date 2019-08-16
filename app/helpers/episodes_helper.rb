module EpisodesHelper
  def youtube_image_link(src)
    "//img.youtube.com/vi/#{src}/sddefault.jpg"
  end

  def youtube_video_link(src)
    "https://www.youtube.com/embed/#{src}"
  end

  def yotube_watch_link(src)
    "https://www.youtube.com/watch?v=#{src}"
  end
end
