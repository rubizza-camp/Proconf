module EpisodesHelper
  def youtube_image_link(src)
    "//img.youtube.com/vi/#{src}/maxresdefault.jpg"
  end

  def youtube_video_link(src)
    "https://www.youtube.com/embed/#{src}"
  end

  def yotube_watch_link(src)
    "https://www.youtube.com/watch?v=#{src}"
  end

  def add_start_path(episode)
    "/add_start/#{episode.id}"
  end

  def add_finish_path(episode)
    "/add_finish/#{episode.id}"
  end
end
