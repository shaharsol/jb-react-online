import './Demo.css'

export default function Demo() {

    const name = 'Kfir'
    const age = 25
    const isAdult = true

    const students = ['Ori', 'Limor', 'Yana']

    function sayHi(): string {
        return 'hi'
    }

    function isChild(): boolean {
        return false
    }

    const animals = [
        {
            type: 'dog',
            name: 'lucky'
        },
        {
            type: 'cat',
            name: 'mitzi'
        },
        {
            type: 'fish',
            name: 'nemo'
        }
    ]

    return (
        <div className='Demo'>
            <p>Your name is {name}</p>
            <p>you are is {age}</p>
            <p>are you adult? {isAdult ? 'yes' : 'no'}</p>
            <div>students are: 
                <ul>
                    {students.map(student => <li key={student}>{student}</li>)}
                </ul>

            </div>
            <p>{sayHi()}</p>
            <p>{isChild() ? 'you are a child': 'you are an adult'}</p>

            <div>
                <ul>
                  {animals.map(animal => <li key={animal.name}>{animal.name} is a {animal.type}</li>)}
                </ul>
            </div>

        </div>
    )
}