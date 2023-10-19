import matplotlib.pyplot as plt
import numpy as np
import csv
import os

def plot_sorting_data(data):
    array_sizes = [row[0] for row in data]
    bubble_sort_averages = [row[1] for row in data]
    insertion_sort_averages = [row[2] for row in data]
    quick_sort_averages = [row[3] for row in data]
    theoretical_nlogn = [row[5] for row in data]
    theoretical_nsquared = [row[6] for row in data]

    plt.figure(figsize=(12, 8))

    plt.scatter(array_sizes, bubble_sort_averages, color='blue', label='Bubble Sort')
    plt.scatter(array_sizes, insertion_sort_averages, color='red', label='Insertion Sort')
    plt.scatter(array_sizes, quick_sort_averages, color='green', label='Quick Sort')
    plt.scatter(array_sizes, theoretical_nlogn, color='purple', label='Theoretical nLogN', marker='x')
    plt.scatter(array_sizes, theoretical_nsquared, color='orange', label='Theoretical nSquared', marker='x')

    z_bubble = np.polyfit(array_sizes, bubble_sort_averages, 3)
    z_insertion = np.polyfit(array_sizes, insertion_sort_averages, 3)
    z_quick = np.polyfit(array_sizes, quick_sort_averages, 3)

    p_bubble = np.poly1d(z_bubble)
    p_insertion = np.poly1d(z_insertion)
    p_quick = np.poly1d(z_quick)

    plt.plot(array_sizes, p_bubble(array_sizes), color='blue', linestyle='dashed')
    plt.plot(array_sizes, p_insertion(array_sizes), color='red', linestyle='dashed')
    plt.plot(array_sizes, p_quick(array_sizes), color='green', linestyle='dashed')

    plt.title("Sorting Algorithm Average Run Time (ms)", fontsize=16)
    plt.xlabel("Array Size", fontsize=14)
    plt.ylabel("Average Time", fontsize=14)
    plt.legend()
    plt.grid(True, which='both', linestyle='--', linewidth=0.5)

    plt.tight_layout()  # To ensure labels fit within the figure bounds
    plt.show()

def get_data_from_csv():
    data = []
    with open(os.path.join(os.path.dirname(__file__), '../data/benchmark_results.csv'), 'r') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            data_row = [float(value) if i > 0 else int(value) for i, value in enumerate(row)]
            data.append(data_row)

    return data

data = get_data_from_csv()

plot_sorting_data(data)
