require 'rails_helper'

RSpec.describe Timecode, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.episode_id = 1
    subject.title = 'Title'
    subject.time = Time.now
    expect(subject).to be_valid
  end

  it 'is not valid without episode id' do
    subject.title = 'Title'
    subject.time = Time.now
    expect(subject).to_not be_valid
  end

  it 'is not valid without title' do
    subject.episode_id = 1
    subject.title = 'Title'
    expect(subject).to_not be_valid
  end

  it 'is not valid without time' do
    subject.episode_id = 1
    subject.time = Time.now
    expect(subject).to_not be_valid
  end
end
