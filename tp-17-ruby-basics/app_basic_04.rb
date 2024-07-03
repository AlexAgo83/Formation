##### WHILE #####
i = 0
while i < 10
  i += 1
  puts "i is now: #{i}"
end

##### TEST: WHILE #####
expected = 15
value = 0
while value != expected
  puts "Get the good number: "
  value = gets.chomp.to_i
  puts "Too low" if value < expected
  puts "Too high" if value > expected
end
puts "You got it!"
