class DownloadService
  attr_reader :episode
  def initialize(episode)
    @episode = episode
  end

  def download
    options = {
      start: start_time,
      end: end_time,
      output_path: "tmp/#{episode.id}"
    }
    video = Viddl::Video.download("https://www.youtube.com/watch?v=#{episode.video}")
    video.create_clip(options).first.path.to_s
  end

  private

  def start_time
    (episode.actual_start - episode.broadcast_begin).to_i
  end

  def end_time
    (episode.actual_finish - episode.broadcast_begin).to_i
  end
end
