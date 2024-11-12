import matplotlib.pyplot as plt

# Create a figure and axis
fig, ax = plt.subplots()

# Define the point coordinates for the diagonal line
start_x = 1
start_y = 1
end_x = 4
end_y = 4

# Plot the diagonal line segment
ax.plot([start_x, end_x], [start_y, end_y],
        'k-', linewidth=20)  # Diagonal line

# Set the limits of the plot with some padding
padding = 1
ax.set_xlim(start_x - padding, end_x + padding)
ax.set_ylim(start_y - padding, end_y + padding)

# Remove the axes for icon-like appearance
ax.axis('off')

# Save the figure as a .png file to the current drive
plt.savefig('./public/line.png', bbox_inches='tight', pad_inches=0, dpi=100)
