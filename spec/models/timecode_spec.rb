require 'rails_helper'

RSpec.describe Timecode, type: :model do
  context 'with valid params' do
    let(:valid_timecode) { described_class.new(episode_id: 1, title: 'Title', time: Time.now) }

    it { expect(valid_timecode).to be_valid }
  end

  context 'with valid params' do
    let(:timecode_withoul_episode_id) { described_class.new(title: 'Title', time: Time.now) }
    let(:timecode_withoul_title) { described_class.new(episode_id: 1, time: Time.now) }
    let(:timecode_withoul_time) { described_class.new(episode_id: 1, title: 'Title') }

    it { expect(timecode_withoul_episode_id).to be_invalid }

    it { expect(timecode_withoul_title).to be_invalid }

    it { expect(timecode_withoul_time).to be_invalid }
  end
end
