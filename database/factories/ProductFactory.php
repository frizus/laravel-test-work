<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ARTICLE' => fake()->unique()->lastName,
            'NAME' => fake()->firstName,
            'STATUS' => fake()->randomElement(Product::STATUSES),
            'DATA' => json_encode(array_combine(fake()->randomElements(['Цвет', 'Размер']), fake()->randomElements(['черный', 'зеленый', '15']))),
        ];
    }
}
