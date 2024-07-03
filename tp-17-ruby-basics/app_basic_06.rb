##### LOOP #####
i = 0
loop do
  i += 1
  puts "i is now: #{i}"
  break if i >= 10
end

##### TEST: WHILE #####
expected = 15
value = 0
loop do
  puts "Get the good number: "
  value = gets.chomp.to_i
  puts "Too low" if value < expected
  puts "Too high" if value > expected
  break if value == expected
end
puts "You got it!"
