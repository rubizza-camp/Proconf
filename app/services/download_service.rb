class DownloadService
  attr_reader :episode
  def initialize(episode)
    @episode = episode
  end

  def create_backup
    episode.backup_video.attach(io: File.open(path_to_video),
                                filename: "#{episode.id}.mp4")
    episode.backup_audio.attach(io: File.open(path_to_audio),
                                filename: "#{episode.id}.mp3")
    cleaner
  end

  private

  def cleaner
    File.delete(path_to_video) if File.exist?(path_to_video)
    File.delete(path_to_audio) if File.exist?(path_to_audio)
  end

  def path_to_video
    @path_to_video ||= download
  end

  def path_to_audio
    @path_to_audio ||= convert
  end

  def download
    video = Viddl::Video.download(create_youtube_link)
    video.create_clip(options).first.path.to_s
  end

  def convert
    FFMPEG::Movie.new(path_to_video).transcode("tmp/#{episode.id}.mp3")
    "tmp/#{episode.id}.mp3"
  end

  def create_youtube_link
    "https://www.youtube.com/watch?v=#{episode.video}"
  end

  def options
    {
      start: start_time,
      end: end_time,
      output_path: "tmp/#{episode.id}"
    }
  end

  def start_time
    (episode.actual_start - episode.broadcast_begin).to_i
  end

  def end_time
    (episode.actual_finish - episode.broadcast_begin).to_i
  end
end
