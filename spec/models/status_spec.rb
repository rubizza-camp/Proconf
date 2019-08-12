require 'rails_helper'

RSpec.describe Status, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.name = 'online'
    expect(subject).to be_valid
  end

  it 'is not valid without name' do
    expect(subject).to_not be_valid
  end
end
