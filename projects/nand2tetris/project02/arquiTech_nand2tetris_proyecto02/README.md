# Explicación del Proceso en los Códigos
# Descripción General

Este proyecto implementa varios componentes fundamentales para el desarrollo de una computadora desde sus elementos básicos, siguiendo el enfoque de *nand2tetris*. Cada componente cumple una función esencial en la construcción de un sistema capaz de realizar operaciones lógicas y aritméticas. Estos componentes son implementados en Hardware Description Language (HDL) y son la base para construir una arquitectura funcional.

Los principales módulos implementados incluyen:

- **HalfAdder.hdl**: Un sumador básico que maneja la suma de dos bits.
- **FullAdder.hdl**: Un sumador completo que maneja la suma de tres bits, incluyendo el acarreo.
- **Add16.hdl**: Un sumador que realiza la suma de dos números de 16 bits, encadenando sumadores completos.
- **Inc16.hdl**: Un circuito que incrementa en 1 un número de 16 bits.
- **ALU.hdl**: Una Unidad Aritmética Lógica que realiza una variedad de operaciones aritméticas y lógicas sobre entradas de 16 bits, controlada por varias señales de control.

Cada uno de estos componentes es clave para el funcionamiento de una arquitectura de procesador, permitiendo realizar desde sumas básicas hasta operaciones lógicas complejas.

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

### Entradas y Salidas

- **Entradas**:
  - `x[16]`, `y[16]`: Operandos de 16 bits.
  - `zx`: Si esta señal es `1`, fuerza `x` a cero.
  - `nx`: Si esta señal es `1`, invierte (not) el valor de `x`.
  - `zy`: Si esta señal es `1`, fuerza `y` a cero.
  - `ny`: Si esta señal es `1`, invierte (not) el valor de `y`.
  - `f`: Si esta señal es `1`, se realiza la suma de `x + y`. Si es `0`, se realiza una operación lógica AND entre `x` e `y`.
  - `no`: Si esta señal es `1`, invierte el resultado de la operación.

- **Salidas**:
  - `out[16]`: Resultado de la operación realizada.
  - `zr`: Si el resultado (`out`) es igual a `0`, esta señal se pone a `1`. Si no, se mantiene en `0`.
  - `ng`: Si el resultado (`out`) es negativo, esta señal se pone a `1`. Si no, se mantiene en `0`.

### Implementación Paso a Paso

1. **Modificación de `x` (sección X)**:
   - **Mux16(a= x, b= false, sel= zx, out= ZXx)**: Si `zx` es `1`, la entrada `x` se fuerza a `0`. Si es `0`, `x` permanece sin cambios.
   - **Not16(in=ZXx , out=notx)**: Invierte todos los bits de `x`.
   - **Mux16(a= ZXx, b= notx, sel= nx, out=NXx)**: Si `nx` es `1`, se selecciona la versión negada de `x`. Si es `0`, `x` queda igual.

2. **Modificación de `y` (sección Y)**:
   - **Mux16(a= y, b= false, sel= zy, out= ZYy)**: Si `zy` es `1`, la entrada `y` se fuerza a `0`. Si es `0`, `y` permanece sin cambios.
   - **Not16(in=ZYy , out=noty)**: Invierte todos los bits de `y`.
   - **Mux16(a= ZYy, b= noty, sel= ny, out=NYy)**: Si `ny` es `1`, se selecciona la versión negada de `y`. Si es `0`, `y` queda igual.

3. **Operación Aritmética/Lógica**:
   - **Add16(a = NXx, b = NYy , out =add16)**: Realiza la suma de `x` e `y` (modificados por las señales de control si corresponde) en complemento a 2.
   - **And16(a= NXx, b=NYy , out= and16)**: Realiza la operación lógica AND entre `x` e `y`.
   - **Mux16(a= and16, b=add16 , sel=f , out= operation)**: Si `f` es `1`, selecciona la suma de `x + y`. Si es `0`, selecciona la operación AND entre `x` e `y`.

4. **Negación del Resultado**:
   - **Not16(in= operation, out=noperation)**: Invierte el resultado de la operación.
   - **Mux16(a= operation, b= noperation, sel=no , out=out)**: Si `no` es `1`, selecciona el resultado negado. Si es `0`, selecciona el resultado tal como está.

5. **Cálculo de Señales de Estado**:
   - **zr**: Si el resultado final (`out`) es igual a `0`, la señal `zr` se pone a `1`. Esto se hace para indicar que el resultado es cero.
   - **ng**: Si el resultado final es negativo (basado en el bit más significativo de `out`), la señal `ng` se pone a `1`, indicando un resultado negativo.

---

