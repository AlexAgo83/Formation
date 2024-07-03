puts "Hello"
puts "World".reverse
varHello = "World"
varHello = "Hello #{varHello * 2}"

##### PROMPT #####
puts "Enter your name: "
name = gets.chomp
puts "Hello #{name}"

##### TEST integer / even #####
puts "Give me a number: "
number = gets.chomp
if number.to_i.even?
  puts "Your number is even"
else
  puts "Your number is odd"
end
