# Explicación del Proceso en los Códigos

## 1. HalfAdder.hdl
El *Half Adder* es el componente más básico de un sumador binario. Su función es sumar dos bits (`a` y `b`) y generar dos salidas: `sum` (el bit menos significativo de la suma) y `carry` (el bit de acarreo si la suma es mayor que 1). El proceso se logra mediante dos compuertas lógicas:
- **XOR**: Se utiliza para calcular `sum`. Esta compuerta retorna 1 solo cuando uno de los dos bits es 1, simulando la suma binaria.
- **AND**: Se utiliza para calcular `carry`, ya que solo hay acarreo cuando ambos bits de entrada son 1.

---

## 2. FullAdder.hdl
El *Full Adder* es una extensión del Half Adder que suma tres bits: `a`, `b`, y `c` (el bit de acarreo de la suma anterior). Para lograr esto, combina varios Half Adders:
1. Primero, se suman los bits `a` y `b` usando una compuerta XOR, y su salida se denomina `xorAB`.
2. Después, el acarreo se calcula usando una compuerta AND entre `a` y `b`.
3. El bit `c` (que viene de una suma previa) se suma a la salida de `xorAB` usando otra compuerta AND para calcular el acarreo resultante.
4. Se combinan los dos resultados de acarreo mediante una compuerta OR para generar el acarreo final (`carry`).
5. Para el bit de suma, se usa una combinación de XOR y AND para manejar el bit de acarreo `c` y la suma intermedia entre `a` y `b`.

Este proceso asegura que cada sumador completo toma en cuenta tanto los dos bits de entrada como el bit de acarreo anterior, lo cual es fundamental para sumar números binarios de más de un bit.

---

## 3. Add16.hdl
El *Add16* implementa la suma de dos números de 16 bits en complemento a dos, encadenando 16 *Full Adders* en cascada. El proceso se desarrolla de la siguiente manera:
1. Se inicia con la suma de los bits menos significativos (`a[0]` y `b[0]`) usando un *Full Adder*, con un valor inicial de `carry` igual a `false` (o 0).
2. El bit de acarreo resultante (`carry`) se propaga hacia el siguiente *Full Adder* que suma `a[1]` y `b[1]`, y así sucesivamente.
3. Este proceso continúa hasta sumar todos los bits, y cada *Full Adder* toma el acarreo de la suma anterior como entrada adicional.

De esta manera, los acarreos se propagan de un bit al siguiente, permitiendo la suma completa de los números de 16 bits.

---

## 4. Inc16.hdl
El chip *Inc16* incrementa en 1 un número binario de 16 bits. El proceso es una simple suma de 1, pero debido a la naturaleza de los números binarios, esto puede implicar un acarreo que se propaga a lo largo de varios bits. El proceso se realiza de la siguiente manera:
1. Se usa un *Half Adder* para sumar 1 al bit menos significativo (`in[0]`), lo que genera un posible acarreo.
2. Ese acarreo se propaga hacia el siguiente bit (`in[1]`), el cual se suma usando un *Full Adder*.
3. El proceso continúa para los 16 bits, propagando el acarreo según sea necesario.

Este encadenamiento asegura que cada bit se incrementa adecuadamente, y cualquier acarreo resultante se maneja correctamente.

---

## 5. ALU.hdl
La *ALU (Arithmetic Logic Unit)* es un componente más complejo que realiza una variedad de operaciones aritméticas y lógicas según las señales de control (`zx`, `nx`, `zy`, `ny`, `f`, `no`). El proceso se logra de la siguiente manera:

1. **Manipulación de entradas**:
   - Si `zx` es 1, se pone a cero la entrada `x`.
   - Si `nx` es 1, se niega (invierte) el valor de `x`.
   - Lo mismo ocurre con `y`: si `zy` es 1, se pone a cero, y si `ny` es 1, se niega.

2. **Operaciones**:
   - Si `f` es 1, la ALU realiza una operación de suma (`x + y`) usando un sumador binario de 16 bits.
   - Si `f` es 0, realiza una operación lógica AND (`x & y`) sobre las dos entradas.

3. **Negación de la salida**:
   - Si `no` es 1, se niega la salida (es decir, se invierten todos los bits).

4. **Cálculo de señales adicionales**:
   - La señal `zr` se activa si la salida es cero, lo cual se verifica comparando la salida con 0.
   - La señal `ng` se activa si la salida es negativa, es decir, si el bit más significativo de la salida (el bit de signo en complemento a dos) es 1.

De esta manera, la ALU puede realizar una variedad de operaciones aritméticas y lógicas, dependiendo de las señales de control proporcionadas.

---

