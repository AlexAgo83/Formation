pupils = [
  {name: "John", age: 25},
  {name: "Jane", age: 22},
  {name: "Jim", age: 30},
  {name: "Jill", age: 27}
]

##### EACH #####
pupils.each do |pupil|
  puts "#{pupil[:name]} is #{pupil[:age]} years old"
end

##### TEST: EACH #####
pupils[0].each do |key, value|
  puts "#{key} is #{value}"
end
