let bestScoreIElement=document.getElementById("I-II-header")
let bestScoreIIIElement=document.getElementById("III-IV-header")
let termIElement=document.getElementById("termI")
let termIIElement=document.getElementById("termII")
let loadingElement=document.getElementById("loading")
let tableElement=document.getElementById("tableContent")
let englishMarkElement=document.getElementById("englishMark")
let englishGradeElement=document.getElementById("englishGrade")
let hindiMarkElement=document.getElementById("hindiMark")
let hindiGradeElement=document.getElementById("hindiGrade")
let mathMarkElement=document.getElementById("mathMark")
let mathGradeElement=document.getElementById("mathGrade")
let totalMarkElement=document.getElementById("totalMark")
let totalGradeElement=document.getElementById("totalGrade")
let resultElement=document.getElementById("result")
let gradeElement=document.getElementById("grade")
let percentageElement=document.getElementById("percentage")

let totalMarkText=parseInt(englishMarkElement.textContent)+parseInt(hindiMarkElement.textContent)+parseInt(mathMarkElement.textContent)
totalMarkElement.textContent=totalMarkText

const englishMark=(parseInt(englishMarkElement.textContent)/200)*100
const hindiMark=(parseInt(hindiMarkElement.textContent)/200)*100
const mathMark=(parseInt(mathMarkElement.textContent)/200)*100
const totalMark=(parseInt(totalMarkText)/600)*100
percentageElement.textContent=`${totalMark.toFixed(3)}%`

const checkStatus=(code)=>{
    if(code===200){
        loadingElement.classList.add("show-loading")
        tableElement.classList.remove("show-report")
    }
}


function studentGrade(mark) {
    if(91 <= mark && mark <= 100){
        return "A1"
    }
    else if (81 <= mark && mark <= 90){
        return "A2"
    }
    else if (71 <= mark && mark <= 80){
        return "B1"
    }
    else if (61 <= mark && mark <= 70){
        return "B2"
    }
    else if (51 <= mark && mark <= 60){
        return "C1"
    }
    else if (41 <= mark && mark <= 50){
        return "C2"
    }
    else if (34 <= mark || mark <= 40){
        return "D"
    }
    else{
        return "E"
    }
    
    }

const englishGrade=studentGrade(englishMark)
englishGradeElement.textContent=englishGrade

const hindiGrade=studentGrade(hindiMark)
hindiGradeElement.textContent=hindiGrade

const mathGrade=studentGrade(mathMark)
mathGradeElement.textContent=mathGrade

const finalGrade=studentGrade(totalMark)
totalGradeElement.textContent=finalGrade

const fetchData=async ()=>{
    const res= await fetch('http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521')
    const data=await res.json()
    console.log(data)
    const {Response} = data
    checkStatus(data.ResponseCode)
    const{ProgressList} =Response
    const {ExamMasters,stGrades,lstInternal,lstStudentInfo}= ProgressList

    bestScoreIElement.textContent=ExamMasters[0].ExamMasterRptName
    termIElement.textContent=ExamMasters[0].ExamMasterName
    bestScoreIIIElement.textContent=ExamMasters[1].ExamMasterRptName
    termIIElement.textContent=ExamMasters[1].ExamMasterName
    
    const overallGrade= stGrades.filter(each=>{
        const grade=each.Grade
        if(grade.includes(totalGradeElement.textContent)){
            return each
        }
    })
    
    const result=overallGrade
    result.map(each=>resultElement.textContent=each.Result)
}

fetchData()
