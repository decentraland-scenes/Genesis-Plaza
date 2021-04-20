

export function addPanels(){

    //board 1
    let board1 = new Entity()
    board1.addComponent(new PlaneShape())
    board1.addComponent(new Transform({
        position:new Vector3(160, 4.65, 140.4),
        scale: new Vector3(2.8,1.55,1.55)
    
    }))

    engine.addEntity(board1)
    board1.getComponent(Transform).rotate(new Vector3(1, 0, 0), 33)



       //board 2
       let board2 = new Entity()
       board2.addComponent(new PlaneShape())
       board2.addComponent(new Transform({
           position:new Vector3(157.4, 4.65, 137.8),
           rotation: Quaternion.Euler(0,90,0),
           scale: new Vector3(2.8,1.55,1.55)
       
       }))
   
       engine.addEntity(board2)
       board2.getComponent(Transform).rotate(new Vector3(1, 0, 0), -33)

          //board 3
    let board3 = new Entity()
    board3.addComponent(new PlaneShape())
    board3.addComponent(new Transform({
        position:new Vector3(160, 4.65, 135.25),
        rotation: Quaternion.Euler(0,180,0),
        scale: new Vector3(2.8,1.55,1.55)
    
    }))

    engine.addEntity(board3)
    board3.getComponent(Transform).rotate(new Vector3(1, 0, 0), 33)


       //board 4
       let board4 = new Entity()
       board4.addComponent(new PlaneShape())
       board4.addComponent(new Transform({
           position:new Vector3(162.6, 4.65, 137.8),
           rotation: Quaternion.Euler(0,270,0),
           scale: new Vector3(2.8,1.55,1.55)
       
       }))
   
       engine.addEntity(board4)
       board4.getComponent(Transform).rotate(new Vector3(1, 0, 0), -33)
}