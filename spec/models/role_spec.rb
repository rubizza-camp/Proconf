require 'rails_helper'

RSpec.describe Role, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.name = Time.now
    expect(subject).to be_valid
  end

  it 'is not valid without name' do
    expect(subject).to_not be_valid
  end
end
