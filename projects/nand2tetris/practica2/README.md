# Preguntas de la práctica 02

- ¿Cuál es el objetivo de cada uno de esos proyectos con sus palabras y describa que debe hacer para desarrollarlo?

    - **Proyecto 2 (Lógica Aritmética - HalfAdder, FullAdder, etc.):** El objetivo del proyecto es profundizar en la *lógica combinacional* a través de la programación de chips como el HalfAdder, FullAdder, entre otros, que son esenciales para realizar operaciones aritméticas en una computadora. Para desarrollarlo, es necesario programar los chips en HDL, utilizando puertas lógicas como AND, OR y XOR, y probar cada componente con simulaciones para verificar que funcionen correctamente. También se requiere una buena comprensión de cómo se combinan estos componentes para construir circuitos más complejos.

    - **Proyecto 3 (Lógica Secuencial - Bit, RAM, PC)**: El objetivo del proyecto es profundizar en la lógica secuencial a través de la construcción de componentes de memoria como el Bit, Registros y RAM, que son fundamentales para el almacenamiento y manejo de datos en una computadora. Para desarrollarlo, es necesario programar estos chips en HDL, utilizando flip-flops (DFF) como bloques básicos para almacenar información y controlar el flujo de datos. Además, se deben realizar simulaciones para garantizar que los chips funcionen correctamente y que sean capaces de gestionar el almacenamiento y recuperación de datos a lo largo del tiempo. También se requiere una buena comprensión de cómo se coordinan las operaciones de lectura y escritura mediante el uso de señales de reloj.

- Explique las principales diferencias entre la lógica aritmética y la lógica secuencial.
    - **Lógica Aritmética (Combinacional)**: Procesa señales de entrada para producir resultados inmediatos, sin tener en cuenta el estado anterior del sistema. Ejemplos: HalfAdder, FullAdder.
    - **Lógica Secuencial**: Depende tanto de las entradas como del estado anterior del sistema (es decir, tiene memoria). Ejemplos: Bit, RAM, PC.

# Bonus
¿Qué tipo de unidades aritmético lógicas existen?
- Las Unidades Aritmético Lógicas (ALU) son componentes esenciales en una CPU que se encargan de realizar operaciones aritméticas y lógicas. Los tipos más comunes de ALU son:

1. **ALU de propósito general:**  
   Capaz de realizar una amplia gama de operaciones, como suma, resta, multiplicación, operaciones lógicas (AND, OR, NOT) y comparaciones. Estas ALU están presentes en la mayoría de los procesadores modernos.

2. **ALU de propósito específico:**  
   Diseñada para tareas específicas, como realizar solo ciertas operaciones aritméticas o lógicas. Son más eficientes en términos de rendimiento y consumo de energía para su tarea designada.

3. **ALU de punto flotante:**  
   Especializada en realizar operaciones matemáticas con números decimales (punto flotante), esenciales para cálculos precisos en gráficos, simulaciones científicas, y otras aplicaciones que requieren alta precisión numérica.
